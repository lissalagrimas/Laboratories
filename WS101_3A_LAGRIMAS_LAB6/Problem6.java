import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

class Product {
    String name;
    double price;

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
}

public class Problem6 {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        List<Product> products = new ArrayList<>();
        products.add(new Product("Laptop", 55000));
        products.add(new Product("Headphones", 1500));
        products.add(new Product("Smartphone", 32000));
        products.add(new Product("Monitor", 8000));
        products.add(new Product("Keyboard", 950));
        products.add(new Product("Graphics Card", 45000));

        System.out.print("Enter the minimum price to filter products: ");
        double minPrice = scanner.nextDouble();

        long count = products.stream()               
                .filter(p -> p.price > minPrice)     
                .count();                           

        System.out.println("Number of products with price greater than " 
                           + minPrice + ": " + count);

        scanner.close();
    }
}