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
		System.out.println("in DAO");
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
	public Business update(int bid, String businessJson) {
		ObjectMapper mapper = new ObjectMapper();
		Business holderBusiness = null;
		Business orgBusiness = null;
		try {
			orgBusiness = em.find(Business.class, bid);
			holderBusiness = mapper.readValue(businessJson, Business.class);
			orgBusiness.setCompanyName(holderBusiness.getCompanyName());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return orgBusiness;
	}

	@Override
	public Boolean destroy(int bid) {
		Business business = em.find(Business.class, bid);
		try {
			em.remove(business);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	
}
