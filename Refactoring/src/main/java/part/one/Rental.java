package part.one;

public class Rental {
    private Movie _movie;
    private int _daysRented;

    public Rental(Movie movie, int daysRented) {
        this._movie = movie;
        this._daysRented = daysRented;
    }

    public int getDaysRented() {
        return _daysRented;
    }

    public Movie getMovie() {
        return _movie;
    }

    public double getCharge() {
        double result = 0;
        switch (_movie.getPriceCode()) {
            case Movie.REGULAR -> {
                result += 2;
                if (getDaysRented() > 2)
                    result += (getDaysRented() - 2) * 1.5;
            }
            case Movie.NEW_RELEASE -> result += getDaysRented() * 3;
            case Movie.CHILDREN -> {
                result += 1.5;
                if (getDaysRented() > 3)
                    result += (getDaysRented() - 3) * 1.5;
            }
        }
        return result;
    }

    public int getFrequentRenterPoints() {
        int frequentRenterPoints = 0;
        frequentRenterPoints++;
        // 최신(new release) 을 이틀 이상 대여하는 경우 추가 포인트 제공
        if ((getMovie().getPriceCode() == Movie.NEW_RELEASE) && getDaysRented() > 1)
            frequentRenterPoints ++;
        return frequentRenterPoints;
    }
}
