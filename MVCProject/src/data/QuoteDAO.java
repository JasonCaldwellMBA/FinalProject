package data;

import java.util.Set;

import entities.Quote;

public interface QuoteDAO {
	
	public Set<Quote> index(int bid);
	public Quote show(int bid, int qid);
	public Quote create(int bid, String quoteJson);
	public Quote update(int bid, int qid, String quoteJson);
	public Boolean destroy(int bid, int qid);
}
