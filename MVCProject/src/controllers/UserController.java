package controllers;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.UserDAO;
import entities.Contact;
import entities.User;

@RestController
public class UserController {

	@Autowired
	private UserDAO dao;
	@RequestMapping(path="/user/{id}", method=RequestMethod.GET)
	public User show(@PathVariable int id, HttpServletResponse res) {
		User user = dao.show(id); 
		if(user != null) {
			res.setStatus(202);
		}
		else {
			res.setStatus(404);
		}
		return user; 
	}
	@RequestMapping(path="/user", method=RequestMethod.POST)
	public User create(@RequestBody String json, HttpServletResponse res){
		User user = dao.create(json); 
		if(user != null) {
			res.setStatus(201);
		}
		else {
			res.setStatus(400); 
		}
		return user; 
	}
	@RequestMapping(path="/user/{id}", method=RequestMethod.PUT)
	public User update(@RequestBody String json, @PathVariable int id, HttpServletResponse res) {
		User user = dao.update(id, json);
		if(user != null) {
			res.setStatus(202);
		}
		else {
			res.setStatus(400); 
		}
		return user; 
	}
	@RequestMapping(path="/user/{id}", method=RequestMethod.DELETE)
	public User destroy(@PathVariable int id, HttpServletResponse res) {
		User user = dao.destroy(id); 
		if(user != null) {
			res.setStatus(202);
		}
		else {
			res.setStatus(400); 
		}
		return user; 
	}
	@RequestMapping(path="/user/{uid}/contact/{cid}", method=RequestMethod.GET)
	public Contact showContact(@PathVariable int uid, @PathVariable int cid, HttpServletResponse res) {
		Contact contact = dao.showContact(uid, cid); 
		if(contact != null) {
			res.setStatus(202);
		}
		else {
			res.setStatus(404);
		}
		return contact; 
	}
	@RequestMapping(path="/user/{uid}", method=RequestMethod.POST)
	public Contact createContact(@PathVariable int uid, @RequestBody String json, HttpServletResponse res){
		Contact contact = dao.createContact(uid, json); 
		if(contact != null) {
			res.setStatus(201);
		}
		else {
			res.setStatus(400); 
		}
		return contact; 
	}
	@RequestMapping(path="/user/{id}/contact/{cid}", method=RequestMethod.PUT)
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
	
}










