package data;

import java.io.IOException;
import java.security.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalField;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Request;
import entities.User;
import entities.Vehicle;

@Repository
@Transactional
public class RequestDAOImpl implements RequestDAO {
	
	@PersistenceContext
	private EntityManager em;

	@Override
	public List<Request> index(int uid) {
		String query = "SELECT r FROM Request r WHERE (r.active = true) AND r.user.id = :id order by r.expireDate"; 
		List<Request> list =  em.createQuery(query, Request.class).setParameter("id", uid)
				.getResultList(); 
		return list; 
	}
	@Override
	public List<Request> indexAllRequests() {
		String query = "SELECT r FROM Request r order by r.expireDate";
		return em.createQuery(query, Request.class)
				.getResultList();
	}
	@Override
	public Request show(int uid, int rid) {
		return em.find(Request.class, rid); 
	}
	@Override
	public Request showForBiz(int id) {
		return em.find(Request.class, id); 
	}
	@Override
	public Request create(int uid, int vid, String requestJson) {
		ObjectMapper mapper = new ObjectMapper(); 
		Request request = null; 
		try {
			request = mapper.readValue(requestJson, Request.class);
			Vehicle v = em.find(Vehicle.class, vid);
			User user = em.find(User.class, uid);
			request.setVehicle(v);
			request.setUser(user);
			em.persist(request);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return request;
	}
	@Override
	public Request update(int uid, int vid, int rid, String requestJson) {
		ObjectMapper mapper = new ObjectMapper();
		Request request = null;
		Request orgRequest = null;
		try {
			request = mapper.readValue(requestJson, Request.class);
			orgRequest = em.find(Request.class, rid);
			orgRequest.setDescription(request.getDescription());
			orgRequest.setCompleteDate(request.getCompleteDate());
			orgRequest.setCompleted(request.isCompleted());
			orgRequest.setImg(request.getImg());
			orgRequest.setExpireDate(request.getExpireDate());
			orgRequest.setEstimate(request.getEstimate());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return orgRequest;
	}

	@Override
	public Request destroy(int uid, int vid, int rid) {
		Request request = em.find(Request.class, uid);
				if (request.isActive()) {
					request.setActive(false);
				} else {
					request.setActive(true);
				}
				return request;
	}

}
