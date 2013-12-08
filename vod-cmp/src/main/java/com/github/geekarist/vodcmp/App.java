package com.github.geekarist.vodcmp;

import org.apache.commons.io.FileUtils;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.File;
import java.io.IOException;
import java.io.PrintStream;

public class App {
    private static PrintStream output = System.out;

    public static void setOutput(PrintStream mock) {
        output = mock;
    }

    public static void main(String[] args) throws IOException {
        output.println(String.format("TF1 VOD: %.2f EUR", priceFromTf1()));
        output.println(String.format("Canal Play: %.2f EUR", priceFromCanalPlay()));
    }

    private static double priceFromCanalPlay() throws IOException {
        String url = "http://vod.canalplay.com/films/cinema/man-of-steel,297,-3,28071.aspx?slot=510";
        Document document = Jsoup.connect(url).referrer("http://www.google.com")
                .userAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0")
                .timeout(20000).get();
        FileUtils.write(new File("/tmp/vod-cmp.html"), document.toString());
        String priceAsStr = document.select("#actionLouerSD").text().split(" ")[0];
        return Double.parseDouble(priceAsStr);
    }

    private static double priceFromTf1() throws IOException {
        String url = "http://mytf1vod.tf1.fr/films/media-19460-Man_of_Steel.html";
        Document document = Jsoup.connect(url).referrer("http://www.google.com")
                .userAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0")
                .timeout(20000).get();
        String priceAsStr = document.select("#head-ctn .button-ctn span").text().split(" ")[0];
        return Double.parseDouble(priceAsStr);
    }
}
