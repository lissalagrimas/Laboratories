import java.util.Scanner;

public class Problem4 {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a string: ");
        String input = scanner.nextLine();

        // Remove spaces and convert to lowercase for cleaner checking
        String cleaned = input.replaceAll("\\s+", "").toLowerCase();

        // Reverse the string
        String reversed = new StringBuilder(cleaned).reverse().toString();

        if (cleaned.equals(reversed)) {
            System.out.println("It is a palindrome!");
        } else {
            System.out.println("It is NOT a palindrome.");
        }

        scanner.close();
    }
}