package data;

import java.io.IOException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Business;
import entities.Request;

@Repository
@Transactional
public class RequestDAOImpl implements RequestDAO {
	
	@PersistenceContext
	private EntityManager em;

	@Override
	public List<Request> index(int rid) {
		String query = "SELECT r FROM Requedt r"; 
		return em.createQuery(query, Request.class)
				.getResultList();
	}

	@Override
	public Request show(int rid) {
		return em.find(Request.class, rid); 
	}

	@Override
	public Request create(int rid, String requestJson) {
		ObjectMapper mapper = new ObjectMapper(); 
		Request request = null; 
		try {
			request = mapper.readValue(requestJson, Request.class);
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
	public Request update(int rid, String requestJson) {
		ObjectMapper mapper = new ObjectMapper();
		Request holderRequest = null;
		Request orgRequest = null;
		try {
			orgRequest = em.find(Request.class, rid);
			holderRequest = mapper.readValue(requestJson, Request.class);
			orgRequest.setDescription(holderRequest.getDescription());
			orgRequest.setCompleteDate(holderRequest.getCompleteDate());
			orgRequest.setCompleted(holderRequest.isCompleted());
			orgRequest.setActive(holderRequest.isActive());
			orgRequest.setImg(holderRequest.getImg());
			orgRequest.setExpireDate(holderRequest.getExpireDate());
			orgRequest.setEstimate(holderRequest.getEstimate());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return orgRequest;
	}

	@Override
	public Boolean destroy(int rid) {
		Request request = em.find(Request.class, rid);
		try {
			em.remove(request);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

}
