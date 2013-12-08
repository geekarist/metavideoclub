package com.github.geekarist.vodcmp;

import org.junit.Ignore;
import org.junit.Test;
import org.mockito.Mockito;

import java.io.IOException;
import java.io.PrintStream;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

public class AppTest {
    @Test
    public void should_print_price_from_tf1_vod_for_given_movie_title() throws IOException {
        // G
        String[] givenArgs = {"man", "of", "steel"};
        PrintStream output = mock(PrintStream.class);
        App.setOutput(output);
        // W
        App.main(givenArgs);
        // T
        // http://mytf1vod.tf1.fr/recherche/str-man%20of%20steel.html
        verify(output).println("TF1 VOD: 4,99 EUR");
    }
    @Test
    public void should_print_price_from_canalplay_vod_for_given_movie_title() throws IOException {
        // G
        String[] givenArgs = {"man", "of", "steel"};
        PrintStream output = mock(PrintStream.class);
        App.setOutput(output);
        // W
        App.main(givenArgs);
        // T
        // https://www.google.fr/search?q=man+of+steel+site%3Avod.canalplay.com
        verify(output).println("Canal Play: 4,99 EUR");
    }
}
