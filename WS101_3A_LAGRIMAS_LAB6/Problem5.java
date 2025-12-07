import java.util.Scanner;

class Rectangle {
    double length;
    double width;

    public Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }

    public double calculateArea() {
        return length * width;
    }
}

public class Problem5 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter length for Rectangle 1: ");
        double length1 = scanner.nextDouble();

        System.out.println("Enter width for Rectangle 1: ");
        double width1 = scanner.nextDouble();

        Rectangle rect1 = new Rectangle(length1, width1);

        System.out.println("\nEnter length for Rectangle 2: ");
        double length2 = scanner.nextDouble();

        System.out.println("Enter width for Rectangle 2: ");
        double width2 = scanner.nextDouble();

        Rectangle rect2 = new Rectangle(length2, width2);

        System.out.println("\n--- Results ---");

        System.out.println("Rectangle 1:");
        System.out.println("Length: " + rect1.length);
        System.out.println("Width: " + rect1.width);
        System.out.println("Area: " + rect1.calculateArea());

        System.out.println("\nRectangle 2:");
        System.out.println("Length: " + rect2.length);
        System.out.println("Width: " + rect2.width);
        System.out.println("Area: " + rect2.calculateArea());

        scanner.close();
    }
}