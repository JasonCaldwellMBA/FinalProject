package test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.List;

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
		assertEquals(25, business.getLaborRate(), 0);
		assertEquals(5, business.getExperience());
		assertEquals("stumpyauto.com", business.getWebsite());
		assertEquals("Stumpy Auto", business.getCompanyName());
		assertNotNull(business.getLoginName());
		assertNotNull(business.getLoginPassword());
	}
	
	@Test
	public void test_business_to_contact_mapping() {
		assertEquals(6, business.getContact().getId());
	}
	
	@Test
	public void test_business_to_rating_mapping() {
		assertEquals(1.0, business.getRating().getRating(), 0);
	}
	
//	@Test
//	public void test_create_business() {
//		em.getTransaction().begin();
//		Business newBusiness = new Business();
//		newBusiness.setContact(business.getContact());
//		newBusiness.setLaborRate(0);
//		newBusiness.setCompanyName("company name");
//		
//		em.persist(newBusiness);
//		em.flush();
//		em.getTransaction().commit();
//
//		newBusiness = em.find(Business.class, 6);
//		assertEquals("company name", newBusiness.getCompanyName());
//	}
	@Test
	public void test_index_business() {
		String query = "Select b from Business b";
		List<Business> list = em.createQuery(query, Business.class)
								.getResultList();
		assertEquals(7, list.size());
		
	}
//	@Test
//	public void test_update_business() {
//		Business business = em.find(Business.class, 3);
//		em.getTransaction().begin();
//		business.setCompanyName("Hodor's Auto");
//		em.getTransaction().commit();
//		Business b = em.find(Business.class, 3);
//		assertEquals("Hodor's Auto", b.getCompanyName());
//	}
//	@Test
//	public void test_destroy_business() {
//		Business b = em.find(Business.class, 5);
//		em.getTransaction().begin();
//		em.remove(b);
//		em.getTransaction().commit();
//		Business bnull = em.find(Business.class, 5);
//		assertEquals(bnull, null);
//	}
	
	@Test
	public void test_business_to_ratings() {
		
	}
	@Test
	public void test_business_to_certs() {
		assertEquals("Automotive master", business.getCertifications().get(0).getName());
	}
	

	
}
