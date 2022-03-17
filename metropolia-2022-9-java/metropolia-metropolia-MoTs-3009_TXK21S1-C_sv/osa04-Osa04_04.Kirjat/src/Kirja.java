public class Kirja {
    private String bookName;
    private int publishYear;
    private int pageCount;


    public Kirja(String bookName, int pageCount, int publishYear) {
        this.bookName = bookName;
        this.publishYear = publishYear;
        this.pageCount = pageCount;
    }

    public String getBookName() {
        return this.bookName;
    }

    public int getPublishYear() {
        return this.publishYear;
    }

    public int getPageCount() {
        return this.pageCount;
    }


    public String toString() {
        return this.bookName + ", " + this.pageCount + " sivua" + ", " + this.publishYear;
    }
}
