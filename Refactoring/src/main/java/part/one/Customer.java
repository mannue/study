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
            double thisAmount = 0;
            Rental each = (Rental)rentals.nextElement();

            // 각 영화에 대한 요금 결정
            thisAmount = amountFor(each);

            // 포인트 (frequent renter points) 추가
            frequentRenterPoints ++;
            // 최신(new release) 을 이틀 이상 대여하는 경우 추가 포인트 제공
            if ((each.getMovie().getPriceCode() == Movie.NEW_RELEASE) && each.getDaysRented() > 1)
                frequentRenterPoints ++;
            // 이 대여에 대한 요금계산 결과 표시
            result += "\t" + each.getMovie().getTitle() + "\t" + String.valueOf(thisAmount) + "\n";
            totalAmount += thisAmount;
        }
        // 풋터(footer) 추가
        result += "Amount owed is " + String.valueOf(totalAmount) + "\n";
        result += "You earned " + String.valueOf(frequentRenterPoints) + "frequent renter points";
        return  result;
    }

    private double amountFor( Rental each) {
        double result = 0;
        switch (each.getMovie().getPriceCode()) {
            case Movie.REGULAR -> {
                result += 2;
                if (each.getDaysRented() > 2)
                    result += (each.getDaysRented() - 2) * 1.5;
            }
            case Movie.NEW_RELEASE -> result += each.getDaysRented() * 3;
            case Movie.CHILDREN -> {
                result += 1.5;
                if (each.getDaysRented() > 3)
                    result += (each.getDaysRented() - 3) * 1.5;
            }
        }
        return result;
    }
}
