<#
  link-framecraft.ps1 —— 把 Framecraft 公共组件动态链接进每个演示包（方案 A2）

  为什么需要它：
  演示包要通过 `file:` 依赖引用 ${TOOLS_ROOT}/framecraft 的公共组件。但 DEV_ROOT 与
  TOOLS_ROOT 是两个独立目录，若把相对路径写死进 package.json，换机器就会断。
  本脚本在安装前运行一次，按本机实际位置生成依赖，package.json 保持可移植。

  用法：
    powershell -File .\link-framecraft.ps1          # 生成/更新链接
    powershell -File .\link-framecraft.ps1 -Check   # 只检查，不写

  之后：pnpm install
#>
[CmdletBinding()]
param([switch]$Check)

$ErrorActionPreference = 'Stop'
function Get-RelPath([string]$fromDir, [string]$toPath) {
  # PS 5.1 没有 [IO.Path]::GetRelativePath，用 Uri 计算
  $f = [System.Uri](((Resolve-Path -LiteralPath $fromDir).Path.TrimEnd('\')) + '\')
  $to = [System.Uri](((Resolve-Path -LiteralPath $toPath).Path.TrimEnd('\')) + '\')
  $rel = $f.MakeRelativeUri($to).ToString()
  return [System.Uri]::UnescapeDataString($rel).TrimEnd('/')
}
$demos = $PSScriptRoot

function Resolve-ToolsRoot {
  $v = [Environment]::GetEnvironmentVariable('TOOLS_ROOT')
  if ($v) { return $v }
  $bind = Join-Path $env:USERPROFILE '.turing\bindings.json'
  if (Test-Path -LiteralPath $bind) {
    $b = Get-Content -LiteralPath $bind -Raw -Encoding UTF8 | ConvertFrom-Json
    $p = $b.PSObject.Properties['TOOLS_ROOT']
    if ($p -and $p.Value) { return [string]$p.Value }
  }
  throw 'TOOLS_ROOT 未绑定：见 MACHINE_BINDINGS.md'
}

$tools = Resolve-ToolsRoot
$framecraft = Join-Path $tools 'framecraft'
if (-not (Test-Path -LiteralPath (Join-Path $framecraft 'package.json'))) {
  throw "Framecraft 未安装或路径不对：$framecraft"
}
Write-Host "TOOLS_ROOT = $tools"
Write-Host "Framecraft = $framecraft"

$pkgs = @(Get-ChildItem -LiteralPath $demos -Directory -Force |
  Where-Object { $_.Name -like '*-animation' -and (Test-Path -LiteralPath (Join-Path $_.FullName 'package.json')) })
if ($pkgs.Count -eq 0) { throw "在 $demos 下没找到 *-animation 演示包" }

$changed = 0
foreach ($p in $pkgs) {
  $pj = Join-Path $p.FullName 'package.json'
  $raw = Get-Content -LiteralPath $pj -Raw -Encoding UTF8
  $obj = $raw | ConvertFrom-Json

  # 计算从本包到 framecraft 的相对路径
  $rel = Get-RelPath $p.FullName $framecraft
  $dep = "file:$rel"

  if (-not $obj.dependencies) {
    $obj | Add-Member -NotePropertyName 'dependencies' -NotePropertyValue ([pscustomobject]@{}) -Force
  }
  $cur = $null
  if ($obj.dependencies.PSObject.Properties['@framecraft/components']) { $cur = $obj.dependencies.'@framecraft/components' }

  if ($cur -eq $dep) {
    Write-Host ("  [OK]   {0,-32} {1}" -f $p.Name, $dep) -ForegroundColor Green
    continue
  }
  Write-Host ("  [UPDATE] {0,-32} {1} → {2}" -f $p.Name, $(if($cur){$cur}else{'(无)'}), $dep) -ForegroundColor Yellow
  if ($Check) { continue }

  $obj.dependencies | Add-Member -NotePropertyName '@framecraft/components' -NotePropertyValue $dep -Force
  ($obj | ConvertTo-Json -Depth 20) | Set-Content -LiteralPath $pj -Encoding UTF8
  $changed++
}

Write-Host ''
if ($Check) { Write-Host '检查完成（未写入）。去掉 -Check 生成依赖。' -ForegroundColor Yellow; exit 0 }
if ($changed -eq 0) { Write-Host '依赖已是最新，无需改动。' -ForegroundColor Green }
else { Write-Host "已更新 $changed 个包。下一步：pnpm install" -ForegroundColor Green }
