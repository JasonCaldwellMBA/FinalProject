package controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.BusinessDAO;
import entities.Business;

@RestController
public class BusinessController {

	@Autowired
	private BusinessDAO dao;
	
	@RequestMapping(path="/business", method=RequestMethod.GET)
	public List<Business> index(HttpServletResponse res){
		System.out.println("In Controller");
		return dao.index();
	}
	
	@RequestMapping(path="/business/{bid}")
	public Business show(@PathVariable int bid, HttpServletResponse res) {
		return dao.show(bid);
	}
		
		
	
}
