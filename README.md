# Portfolio-Template-Website

Login or Sign up

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
      Scanner sc = new Scanner(System.in);
      System.out.println("Enter name: ");
      String name = sc.nextLine();
      System.out.print(name.substring(0,1));
      System.out.print(" " + name.charAt(name.indexOf(" ") + 1));
      System.out.print(" " + name.charAt(name.indexOf(" ", name.indexOf(" ") + 1) + 1));
      sc.close();
      
  }
}
