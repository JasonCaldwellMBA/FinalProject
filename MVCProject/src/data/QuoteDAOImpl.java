package data;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Business;
import entities.Quote;
import entities.Request;

@Transactional
@Repository
public class QuoteDAOImpl implements QuoteDAO {
	
	@PersistenceContext
	private EntityManager em;

	@Override
    public List<Quote> index(int uid, int rid) {
        String query = "SELECT q FROM Quote q WHERE q.request.id = :rid";
        List<Quote> quotes = em.createQuery(query, Quote.class)
                            .setParameter("rid", rid)
                            .getResultList();
        System.out.print(rid);
        return quotes;
    }
    @Override
    public Quote show(int uid, int rid, int qid) {
        return em.find(Quote.class, qid);
    }

    @Override
    public Quote create(int uid, int rid, String quoteJson) {
        ObjectMapper om = new ObjectMapper();
        Quote quote = null;
        try {
            quote = om.readValue(quoteJson, Quote.class);
            Request request = em.find(Request.class, rid);
            quote.setRequest(request);
            
            em.persist(quote);
            em.flush();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return quote;
    }

    @Override
    public Quote update(int uid, int rid, int qid, String quoteJson) {
        ObjectMapper om = new ObjectMapper();
        Quote updateQuote = null;
        Quote origQuote = null;
        try {
            updateQuote = om.readValue(quoteJson, Quote.class);
            origQuote = em.find(Quote.class, qid);
            origQuote.setDescription(updateQuote.getDescription());
            origQuote.setPostDate(updateQuote.getPostDate());
            origQuote.setExpireDate(updateQuote.getExpireDate());
            origQuote.setCompleteDate(updateQuote.getCompleteDate());
            origQuote.setEstimate(updateQuote.getEstimate());
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        return origQuote;
    }

    @Override
    public Quote destroy(int uid, int rid, int qid) {
        Quote quote = em.find(Quote.class, qid);
        if (quote.isActive()) {
            quote.setActive(false);
        }
        else {
        		quote.setActive(true);
        }
        return quote;
    }
    
    
    public Set<Quote> indexQuoteForBusiness(int bid) {
        String query = "SELECT q FROM Quote q WHERE q.business.id = :bid AND q.business.active = true AND q.active = true";
        
        List<Quote> quotes = em.createQuery(query, Quote.class)
                            .setParameter("bid", bid)
                            .getResultList();
        return new HashSet<Quote>(quotes);
    }
    

	@Override
    public Quote showBiz(int bid, int qid) {
		return em.find(Quote.class, qid);
    }

    @Override
    public Quote createBiz(int bid, int rid, String quoteJson) {
        ObjectMapper om = new ObjectMapper();
        Quote quote = null;
        try {
            quote = om.readValue(quoteJson, Quote.class);
            Business business = em.find(Business.class, bid);
            quote.setBusiness(business);
            Request request = em.find(Request.class, rid);
            quote.setRequest(request);
            quote.setActive(true);
            
            em.persist(quote);
            em.flush();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return quote;
    }

    @Override
    public Quote updateBiz(int bid, int qid, String quoteJson) {
        ObjectMapper om = new ObjectMapper();
        Quote updateQuote = null;
        Quote origQuote = null;
        System.out.println("at impl");
        try {
            updateQuote = om.readValue(quoteJson, Quote.class);
            origQuote = em.find(Quote.class, qid);
            origQuote.setDescription(updateQuote.getDescription());
            origQuote.setPostDate(updateQuote.getPostDate());
            origQuote.setExpireDate(updateQuote.getExpireDate());
            origQuote.setCompleteDate(updateQuote.getCompleteDate());
            origQuote.setEstimate(updateQuote.getEstimate());

            
        } catch (Exception e) {
            e.printStackTrace();
        }
        return origQuote;
    }

    @Override
    public Quote destroyBiz(int bid, int rid, int qid) {
        Quote quote = em.find(Quote.class, qid);
        if (quote.isActive()) {
            quote.setActive(false);
        }
        else {
        		quote.setActive(true);
        }
        return quote;
    }

}
