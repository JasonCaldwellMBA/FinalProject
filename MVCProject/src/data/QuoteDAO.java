package data;

import java.util.Collection;
import java.util.List;

import entities.Quote;

public interface QuoteDAO {
	public List<Quote> index(int uid, int rid);
	public Quote show(int uid, int rid, int qid);
	public Quote create(int uid, int rid, String quoteJson);
	public Quote update(int uid, int qid, int rid, String quoteJson);
	public Quote destroy(int uid, int rid, int qid);
	
	public Collection<Quote> indexQuoteForBusiness(int bid);
	public Quote showBiz(int bid, int qid);
	public Quote createBiz(int bid, int rid, String quoteJson);
	public Quote updateBiz(int bid, int rid, int qid, String quoteJson);
	public Quote destroyBiz(int bid, int rid, int qid);
}
