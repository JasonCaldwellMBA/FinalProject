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

//  GET /business/{bid}/quote
    @RequestMapping(path = "/business/{bid}/quote", method = RequestMethod.GET)
    public Collection<Quote> index(
            HttpServletRequest req, 
            HttpServletResponse res, 
            @PathVariable int bid) {
        return quoteDAO.index(bid);
    }
    
//  GET /business/{bid}/quote/{qid}
    @RequestMapping(path = "/business/{bid}/quote/{qid}", method = RequestMethod.GET)
    public Quote show(
                HttpServletRequest req, 
                HttpServletResponse res, 
                @PathVariable int bid, 
                @PathVariable int qid) {
        return quoteDAO.show(bid, qid);
    }
    
//  POST /business/{bid}/quote
    @RequestMapping(path = "/business/{bid}/quote", method = RequestMethod.POST)
    public Quote create(
            HttpServletRequest req, 
            HttpServletResponse res, 
            @PathVariable int bid, 
            @RequestBody String quoteJson) {
        
        Quote quote = quoteDAO.create(bid, quoteJson);
        if (quote == null) {
            res.setStatus(400);
        }
        return quote;
    }
    
//  PUT /business/{bid}/quote/{qid}
    @RequestMapping(path = "/business/{bid}/quote/{qid}", method = RequestMethod.PUT)
    public Quote update(
            HttpServletRequest req, 
            HttpServletResponse res, 
            @PathVariable int bid, 
            @PathVariable int qid, 
            @RequestBody String quoteJson) {
        Quote quote = quoteDAO.update(bid, qid, quoteJson);
        if (quote == null) {
            res.setStatus(400);
        }
        return quote;
    }
    
//  DELETE /business/{bid}/quote/{qid}
    @RequestMapping(path = "/business/{bid}/quote/{qid}", method = RequestMethod.DELETE)
    public Boolean destroy(
            HttpServletRequest req, 
            HttpServletResponse res, 
            @PathVariable int bid,
            @PathVariable int qid) {
        Boolean result = quoteDAO.destroy(bid, qid);
        if (result == null) {
            res.setStatus(404);
        }
        return result;
    }

}


