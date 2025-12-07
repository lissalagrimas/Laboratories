import java.util.Scanner;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Problem1 {
    public static void main(String[] args) throws IOException {

        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        System.out.print("Enter your age: ");
        int age = Integer.parseInt(br.readLine());

        System.out.println("Hello, " + name + "! You are " + age + " years old.");

        scanner.close();
    }
}