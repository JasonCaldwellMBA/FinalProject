package controllers;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.QuoteDAO;
import entities.Quote;

@RestController
public class QuoteController {
    
    @Autowired
    private QuoteDAO quoteDAO;

    @RequestMapping(path = "/business/{bid}/request/{rid}/quote", method = RequestMethod.GET)
    public Collection<Quote> index(
            HttpServletRequest req, 
            HttpServletResponse res, 
            @PathVariable int rid,
    			@PathVariable int bid) {
        return quoteDAO.index(bid, rid);
    }
    
    @RequestMapping(path = "/business/{bid}/request/{rid}/quote/{qid}", method = RequestMethod.GET)
    public Quote show(
                HttpServletRequest req, 
                HttpServletResponse res, 
                @PathVariable int bid, 
                @PathVariable int rid, 
                @PathVariable int qid) {
        return quoteDAO.show(bid, rid, qid);
    }
    
    @RequestMapping(path = "/business/{bid}/request/{rid}/quote", method = RequestMethod.POST)
    public Quote create(
            HttpServletRequest req, 
            HttpServletResponse res, 
            @PathVariable int bid, 
            @PathVariable int rid, 
            @RequestBody String quoteJson) {
        
        Quote quote = quoteDAO.create(bid, rid, quoteJson);
        if (quote == null) {
            res.setStatus(400);
        }
        return quote;
    }
    
    @RequestMapping(path = "/business/{bid}/request/{rid}/quote/{qid}", method = RequestMethod.PUT)
    public Quote update(
            HttpServletRequest req, 
            HttpServletResponse res, 
            @PathVariable int bid, 
            @PathVariable int rid, 
            @PathVariable int qid, 
            @RequestBody String quoteJson) {
        Quote quote = quoteDAO.update(bid, rid, qid, quoteJson);
        if (quote == null) {
            res.setStatus(400);
        }
        return quote;
    }
    
    @RequestMapping(path = "/business/{bid}/request/{rid}/quote/{qid}", method = RequestMethod.DELETE)
    public Boolean destroy(
            HttpServletRequest req, 
            HttpServletResponse res, 
            @PathVariable int bid,
            @PathVariable int qid,
    			@PathVariable int rid) {
        Boolean result = quoteDAO.destroy(bid, rid, qid);
        if (result == null) {
            res.setStatus(404);
        }
        return result;
    }

}


