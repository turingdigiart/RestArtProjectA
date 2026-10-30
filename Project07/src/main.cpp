#include <iostream>

void template01()
{
	
}

void template02()
{
	// assigned in stack
	// stack assignment will be destroyed at the end of current bracket;
	int arr[5]{ 1,10,100,1000,10000 };


	// assigned in heap
	// heap assignment will be destroyed only when the program get to end except use delete;
	int* ptr = new int[5] {1, 10, 100, 1000, 10000};


	std::cout << "arr:" << arr << std::endl;
	std::cout << "ptr:" << ptr << std::endl;
	std::cout << std::endl;
	std::cout << "ptr+1:" << ptr + 1 << std::endl;
	std::cout << "*(ptr+1):" << *(ptr + 1) << std::endl;
	std::cout << std::endl;
	std::cout << "ptr+4:" << ptr + 4 << std::endl;
	std::cout << "*(ptr+4):" << *(ptr + 4) << std::endl;
	std::cout << std::endl;
	std::cout << "ptr+5(out of bound):" << ptr + 5 << std::endl;
	std::cout << "*(ptr+5)(out of bound):" << *(ptr + 5) << std::endl;

	delete[] ptr;

}


void template03()
{
	// assigned in stack
	// stack assignment will be destroyed at the end of current bracket;
	int arr[5]{ 1,10,100,1000,10000 };
	int* ptr = arr;

	// assigned in heap
	// heap assignment will be destroyed only when the program get to end except use delete;
	int* ptrA = new int[5] {1, 10, 100, 1000, 10000};
	int* ptrB = new int[9] {1, 10, 100, 1000, 10000, 10, 100, 1000, 10000};

	std::cout << "arr size:" << sizeof(arr) << std::endl;
	std::cout << "ptr size:" << sizeof(ptr) << std::endl;
	std::cout << "ptrA size:" << sizeof(ptrA) << std::endl;
	std::cout << "ptrB size:" << sizeof(ptrB) << std::endl;

}

int main(int argc, const char* argv[])
{
	template01();
	return 0;
}