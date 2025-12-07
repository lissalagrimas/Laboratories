import java.util.Scanner;

public class Problem3 {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        int[] numbers = new int[5];
        int sum = 0;

        System.out.println("Enter 5 numbers:");

        for (int i = 0; i < 5; i++) {
            System.out.print("Number " + (i + 1) + ": ");
            numbers[i] = scanner.nextInt();
            sum += numbers[i];
        }

        double average = sum / 5.0;

        System.out.println("\nNumbers in array: ");
        for (int n : numbers) {
            System.out.print(n + " ");
        }

        System.out.println("\n\nSum = " + sum);
        System.out.println("Average = " + average);

        scanner.close();
    }
}