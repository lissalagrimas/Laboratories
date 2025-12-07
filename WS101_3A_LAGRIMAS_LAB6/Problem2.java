import java.util.Scanner;

public class Problem2 {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter number of terms (N): ");
        int N = scanner.nextInt();

        int a = 0, b = 1;

        System.out.print("Fibonacci Series: ");

        for (int i = 1; i <= N; i++) {
            System.out.print(a + " ");
            int next = a + b;
            a = b;
            b = next;
        }

        scanner.close();
    }
}