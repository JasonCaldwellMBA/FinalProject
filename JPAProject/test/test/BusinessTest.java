package test;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Business;

public class BusinessTest {
	private EntityManagerFactory emf;
	private EntityManager em;
	private Business business;
	
	@Before
	  public void setUp() throws Exception {
		this.emf = Persistence.createEntityManagerFactory("AutoDB");
		this.em = emf.createEntityManager();
		business = em.find(Business.class, 1);
	}
	
	@After
	  public void tearDown() throws Exception { 
		this.em.close();
		this.emf.close();
		business = null;
	}
	
	@Test
	public void test_business() {
		assertEquals(1, business.getId());
	}
	
	
	@Test
	public void test_business_mapping() {
		assertEquals(1, business.getId());
		assertEquals(1, business.getContact().getId());
		assertEquals("Oil Change", business.getCertifications().get(0).getName());
		assertEquals(5.0, business.getRating().getRating(), 0);
		assertEquals(1.0, business.getLaborRate(), 0);
		assertEquals(1, business.getExperience());
		assertEquals("theautoshop.com", business.getWebsite());
		assertEquals("The Auto Shop", business.getCompanyName());
	}
	@Test
	public void test_create_business() {
		em.getTransaction().begin();
		Business newBusiness = new Business();
		newBusiness.setContact(business.getContact());
		newBusiness.setLaborRate(0);
		newBusiness.setCompanyName("company name");
		
		em.persist(newBusiness);
		em.flush();
		em.getTransaction().commit();
		em.close();
		emf.close();
		newBusiness = em.find(Business.class, 6);
		assertEquals("company name", newBusiness.getCompanyName());
	}

	
}
