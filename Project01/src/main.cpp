#include <iostream>
#include <string>

void speak(const char * content)
{
	std::cout << content << std::endl;
}

void speak(int content)
{
	std::cout << content << std::endl;
}

void selfadd(int & num)
{
	num++;
}

int main(int argc, const char * argv[])
{
	int a = 5; // left value right value

	selfadd(a); // reference

	speak(a);
}
