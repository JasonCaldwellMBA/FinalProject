package controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.BusinessDAO;
import entities.Business;
import entities.Certification;
import entities.Contact;
import entities.Vehicle;
@CrossOrigin
@RestController
public class BusinessController {

	@Autowired
	private BusinessDAO dao;
	
	@RequestMapping(path="/business", method=RequestMethod.GET)
	public List<Business> index(HttpServletResponse res){
		System.out.println("In Controller");
		return dao.index();
	}
	
	@RequestMapping(path="/business/{bid}", method=RequestMethod.GET)
	public Business show(@PathVariable int bid, HttpServletResponse res) {
		return dao.show(bid);
	}
	
	@RequestMapping(path="/business", method=RequestMethod.POST)
	public Business create(HttpServletResponse res, @RequestBody String busJson) {
		Business bus = dao.create(busJson);
		if (bus == null) {
			res.setStatus(400);
		} else {
			res.setStatus(201);
		}
		return bus;
	}
	
	@RequestMapping(path="/business/{bid}", method=RequestMethod.PUT)
	public Business update(HttpServletResponse res,
						  @RequestBody String json,
						  @PathVariable int bid) {
		Business bus = dao.update(bid, json);
		if (bus == null) {
			res.setStatus(400);
		} else {
			res.setStatus(201);
		}
		return bus;
	}
	
	@RequestMapping(path="/business/{bid}", method=RequestMethod.DELETE)
	public Business destroy(HttpServletResponse res, @PathVariable int bid) {
		Business bus = dao.destroy(bid);
		if (bus != null) {
			res.setStatus(202);
		} else {
			res.setStatus(400);
		}
		return bus;
	}
	@RequestMapping(path="/business/{bid}/contact/{cid}", method=RequestMethod.GET)
	public Contact showContact(@PathVariable int bid, @PathVariable int cid, HttpServletResponse res) {
		Contact contact = dao.showContact(bid, cid); 
		if(contact != null) {
			res.setStatus(202);
		}
		else {
			res.setStatus(404);
		}
		return contact; 
	}
	@RequestMapping(path="/business/{bid}", method=RequestMethod.POST)
	public Contact createContact(@PathVariable int bid, @RequestBody String json, HttpServletResponse res){
		Contact contact = dao.createContact(bid, json); 
		if(contact != null) {
			res.setStatus(201);
		}
		else {
			res.setStatus(400); 
		}
		return contact; 
	}
	@RequestMapping(path="/business/{id}/contact/{cid}", method=RequestMethod.PUT)
	public Contact updateContact(@RequestBody String json, @PathVariable int cid, @PathVariable int id, HttpServletResponse res) {
		Contact contact = dao.updateContact(id,cid,json);
		if(contact != null) {
			res.setStatus(202);
		}
		else {
			res.setStatus(400); 
		}
		return contact; 
	}
	
	@RequestMapping(path="/business/{bid}/certification", method=RequestMethod.GET)
	public List<Certification> indexCert(@PathVariable int bid, HttpServletResponse res) {
		List<Certification> certifications = dao.indexCert(bid);
		if(certifications != null) {
			res.setStatus(202);
		}
		else {
			res.setStatus(404);
		}
		return certifications;
	}
	
	@RequestMapping(path="/business/{bid}/certification/{certid}", method=RequestMethod.GET)
	public Certification show(@PathVariable int bid, @PathVariable int certid, HttpServletResponse res) {
		Certification cert = dao.showCert(bid, certid); 
		if(cert != null) {
			res.setStatus(202);
		}
		else {
			res.setStatus(404);
		}
		return cert; 
	}
	
	@RequestMapping(path="/business/{bid}/certification", method=RequestMethod.POST)
	public Certification createCert(@PathVariable int bid, HttpServletResponse res, @RequestBody String certJson) {
		Certification cert = dao.createCert(bid, certJson);
		if (cert == null) {
			res.setStatus(400);
		} else {
			res.setStatus(201);
		}
		return cert;
	}
	
	@RequestMapping(path="/business/{bid}/certification/{certid}", method=RequestMethod.PUT)
	public Certification updateCert(@PathVariable int bid, @PathVariable int certid,  @RequestBody String json, HttpServletResponse res) {
		Certification cert = dao.updateCert(bid, certid, json); 
		if(cert != null) {
			res.setStatus(201);
		}
		else {
			res.setStatus(400);
		}
		return cert; 
	}
	
	@RequestMapping(path="/business/{bid}/certification/{certid}", method=RequestMethod.DELETE)
	public Boolean destroy(@PathVariable int bid, @PathVariable int certid, HttpServletResponse res) {
		Boolean result = dao.deleteCert(bid, certid); 
		if(result == null) {
			res.setStatus(404);
		}
		return result; 
	}
}
