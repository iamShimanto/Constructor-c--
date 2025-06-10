#include <iostream>
#include <string>
using namespace std;

class Car{
    public:
    string brand;
    string model;
    int year;
    Car(string x , string y , int z);
};

Car::Car(string x , string y , int z){
    brand = x;
    model = y;
    year = z;
}

int main(){

    string brand, model;
    int year;
    cout << "Enter your car brand : ";
    getline(cin, brand);
    cout << "Enter your car model : ";
    getline(cin, model);
    cout << "Enter your car Year : ";
    cin >> year;

    Car mycar(brand, model , year);
    cout << endl;

    cout << "Your car details is : " << endl
         << "Brand : " << mycar.brand << endl
         << "Model : " << mycar.model << endl
         << "Year : " << mycar.year << endl;

    return 0;
}
