package part.one;

import java.util.Enumeration;
import java.util.Vector;

public class Customer {
    private String _name;
    private Vector _rentals = new Vector();

    public Customer(String name) {
        this._name = name;
    }

    public void addRental(Rental arg) {
        _rentals.addElement(arg);
    }

    public String getName() {
        return _name;
    }

    // Todo
    // 요구사항 변경이 복잡하게 변경되어야 한다.
    //
    public String statement() {
        double totalAmount = 0;
        int frequentRenterPoints = 0;
        Enumeration rentals = _rentals.elements();
        String result = "Rental Record for " + getName() + "\n";
        while (rentals.hasMoreElements()) {
            Rental each = (Rental)rentals.nextElement();

            // 포인트 (frequent renter points) 추가
            frequentRenterPoints += each.getFrequentRenterPoints();

            // 이 대여에 대한 요금계산 결과 표시
            result += "\t" + each.getMovie().getTitle() + "\t" + String.valueOf(each.getCharge()) + "\n";
            totalAmount += each.getCharge();
        }
        // 풋터(footer) 추가
        result += "Amount owed is " + String.valueOf(totalAmount) + "\n";
        result += "You earned " + String.valueOf(frequentRenterPoints) + "frequent renter points";
        return  result;
    }
}
