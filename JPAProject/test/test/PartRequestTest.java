package test;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.PartRequest;

public class PartRequestTest {
	private EntityManagerFactory emf;
	private EntityManager em;
	private PartRequest partRequest;
	
	@Before
	  public void setUp() throws Exception {
		this.emf = Persistence.createEntityManagerFactory("AutoDB");
		this.em = emf.createEntityManager();
		partRequest = em.find(PartRequest.class, 1);
	}
	
	@After
	  public void tearDown() throws Exception { 
		this.em.close();
		this.emf.close();
		partRequest = null;
	}
	
	@Test
	public void test_part_request() {
		assertEquals(1, partRequest.getId());
	}
	
	
	@Test
	public void test_part_request_mapping() {
	}
	
}