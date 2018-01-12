package controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.RequestDAO;
import entities.Request;

@RestController
public class RequestController {

	@Autowired
	private RequestDAO dao;

	@RequestMapping(path = "user/{id}/request", method = RequestMethod.GET)
	public List<Request> index(HttpServletResponse res, @PathVariable int id) {
		System.out.println("In Controller");
		return dao.index(id);
	}

	@RequestMapping(path = "/user/{uid}/request/{rid}", method = RequestMethod.GET)
	public Request show(@PathVariable int uid, @PathVariable int rid, HttpServletResponse res) {
		Request request = dao.show(uid, rid);
		if (request != null) {
			res.setStatus(202);
		} else {
			res.setStatus(404);
		}
		return request;
	}

	@RequestMapping(path = "/user/{uid}/vehicle/{vid}/request", method = RequestMethod.POST)
	public Request create(@RequestBody String requestJson, HttpServletResponse res, HttpServletRequest req,
			@PathVariable int vid, @PathVariable int uid) {
		Request request = dao.create(uid, vid, requestJson);
		if (request != null) {
			res.setStatus(201);
		} else {
			res.setStatus(400);
		}
		return request;
	}

	@RequestMapping(path = "/user/{uid}/vehicle/{vid}/request/{rid}", method = RequestMethod.PUT)
	public Request update(@RequestBody String requestJson, HttpServletResponse res, HttpServletRequest req,
			@PathVariable int vid, @PathVariable int rid, @PathVariable int uid) {
		Request request = dao.update(uid, vid, rid, requestJson);
		if (request != null) {
			res.setStatus(201);
		} else {
			res.setStatus(400);
		}
		return request;
	}

	@RequestMapping(path = "/user/{uid}/vehicle/{vid}/request/{rid}", method = RequestMethod.DELETE)
	public Request destroy(HttpServletResponse res, HttpServletRequest req, @PathVariable int vid,
			@PathVariable int rid, @PathVariable int uid) {
		Request r = dao.destroy(vid, rid, uid);
		if (r != null) {
			res.setStatus(202);
		} else {
			res.setStatus(404);
		}
		return r;
	}
}
