package data;

import java.util.Set;

import entities.Quote;

public interface QuoteDAO {
	
	public Set<Quote> index(int bid, int rid);
	public Quote show(int bid, int rid, int qid);
	public Quote create(int bid, int rid, String quoteJson);
	public Quote update(int bid, int qid, int rid, String quoteJson);
	public Boolean destroy(int bid, int rid, int qid);
}
