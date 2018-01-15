package controllers;

import java.util.Collection;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.QuoteDAO;
import entities.Quote;
@CrossOrigin
@RestController
public class QuoteController {
    
    @Autowired
    private QuoteDAO quoteDAO;

    @RequestMapping(path = "/business/{bid}/quote", method = RequestMethod.GET)
    public Collection<Quote> indexQuotesForBusiness(
    		HttpServletRequest req, 
    		HttpServletResponse res,
    		@PathVariable int bid) {
    	return quoteDAO.indexQuoteForBusiness(bid);
    }
    
    @RequestMapping(path = "/business/{bid}/quote/{qid}", method = RequestMethod.GET)
    public Quote showBiz(
                HttpServletRequest req, 
                HttpServletResponse res, 
                @PathVariable int bid, 
                @PathVariable int qid) {
    		Quote quote = quoteDAO.showBiz(bid, qid);
    		if (quote == null) {
            res.setStatus(400);
        }
    		return quote;
    }
    
    @RequestMapping(path = "/business/{bid}/request/{rid}/quote", method = RequestMethod.POST)
    public Quote createBiz(
            HttpServletRequest req, 
            HttpServletResponse res, 
            @PathVariable int bid, 
            @PathVariable int rid, 
            @RequestBody String quoteJson) {
        
        Quote quote = quoteDAO.createBiz(bid, rid, quoteJson);
        if (quote == null) {
            res.setStatus(400);
        }
        return quote;
    }
    
    @RequestMapping(path = "/business/{bid}/reqest/{rid}/quote/{qid}", method = RequestMethod.PUT)
    public Quote updateBiz(
            HttpServletRequest req, 
            HttpServletResponse res, 
            @PathVariable int bid, 
            @PathVariable int rid, 
            @PathVariable int qid, 
            @RequestBody String quoteJson) {
        Quote quote = quoteDAO.updateBiz(bid, rid, qid, quoteJson);
        if (quote == null) {
            res.setStatus(400);
        }
        return quote;
    }
    
    @RequestMapping(path = "/business/{bid}/request/{rid}/quote/{qid}", method = RequestMethod.DELETE)
    public Quote destroyBiz(
            HttpServletRequest req, 
            HttpServletResponse res, 
            @PathVariable int bid,
            @PathVariable int rid,
            @PathVariable int qid) {
        Quote quote = quoteDAO.destroyBiz(bid, rid, qid);
        if (quote == null) {
            res.setStatus(404);
        }
        else {
        		res.setStatus(200);
        }
        return quote;
    }
    
    
    @RequestMapping(path = "/user/{uid}/request/{rid}/quote", method = RequestMethod.GET)
    public List<Quote> index(HttpServletRequest req, HttpServletResponse res,
    		@PathVariable int rid,
    		@PathVariable int uid) {
    	List<Quote> quotes = quoteDAO.index(uid, rid); 
    	return quotes;
    }
    
    @RequestMapping(path = "/user/{uid}/request/{rid}/quote/{qid}", method = RequestMethod.GET)
    public Quote show(
    		HttpServletRequest req, 
    		HttpServletResponse res, 
    		@PathVariable int uid, 
    		@PathVariable int rid, 
    		@PathVariable int qid) {
    	Quote quote = quoteDAO.show(uid, rid, qid);
    	if (quote == null) {
    		res.setStatus(400);
    	}
    	return quote;
    }
    
    @RequestMapping(path = "/user/{uid}/request/{rid}/quote", method = RequestMethod.POST)
    public Quote create(
    		HttpServletRequest req, 
    		HttpServletResponse res, 
    		@PathVariable int uid, 
    		@PathVariable int rid, 
    		@RequestBody String quoteJson) {
    	
    	Quote quote = quoteDAO.create(uid, rid, quoteJson);
    	if (quote == null) {
    		res.setStatus(400);
    	}
    	return quote;
    }
    
    @RequestMapping(path = "/user/{uid}/request/{rid}/quote/{qid}", method = RequestMethod.PUT)
    public Quote update(
    		HttpServletRequest req, 
    		HttpServletResponse res, 
    		@PathVariable int uid, 
    		@PathVariable int rid, 
    		@PathVariable int qid, 
    		@RequestBody String quoteJson) {
    	Quote quote = quoteDAO.update(uid, rid, qid, quoteJson);
    	if (quote == null) {
    		res.setStatus(400);
    	}
    	return quote;
    }
    
    @RequestMapping(path = "/user/{uid}/request/{rid}/quote/{qid}", method = RequestMethod.DELETE)
    public Quote destroy(
    		HttpServletRequest req, 
    		HttpServletResponse res, 
    		@PathVariable int uid,
    		@PathVariable int qid,
    		@PathVariable int rid) {
    	Quote quote = quoteDAO.destroy(uid, rid, qid);
    	if (quote == null) {
    		res.setStatus(404);
    	}
    	else {
    		res.setStatus(200);
    	}
    	return quote;
    }

}


