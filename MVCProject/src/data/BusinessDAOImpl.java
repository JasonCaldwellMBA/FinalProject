package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Business;

@Repository
@Transactional
public class BusinessDAOImpl implements BusinessDAO {
	
	@PersistenceContext
	private EntityManager em;

	@Override
	public List<Business> index(int bid) {
		String query = "Select b from Business b";
		return em.createQuery(query, Business.class)
				 .getResultList();
	}

	@Override
	public Business show(int bid) {
		return em.find(Business.class, bid);
	}

	@Override
	public Business create(int bid, String businessJson) {
		ObjectMapper mapper = new ObjectMapper();
		Business business = null;
		try {
			business = mapper.readValue(businessJson, Business.class);
			em.persist(business);
			em.flush();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return business;
	}

	@Override
	public Business update(int uid, int tid, String todoJson) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boolean destroy(int uid, int tid) {
		// TODO Auto-generated method stub
		return null;
	}

	
}
