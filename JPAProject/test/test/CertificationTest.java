package test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Certification;

public class CertificationTest {
	private EntityManagerFactory emf;
	private EntityManager em;
	private Certification certification;
	
	@Before
	  public void setUp() throws Exception {
		this.emf = Persistence.createEntityManagerFactory("AutoDB");
		this.em = emf.createEntityManager();
		certification = em.find(Certification.class, 1);
	}
	
	@After
	  public void tearDown() throws Exception { 
		this.em.close();
		this.emf.close();
		certification = null;
	}
	
	@Test
	public void test_certification() {
		assertEquals(1, certification.getId());
	}
	
	@Test
	public void test_certification_mapping() {
		assertNotNull(certification.getId());
		assertNotNull(certification.getName());
	}
	
	@Test
	public void test_cert_to_biz_mapping() {
		assertNotNull(certification.getBusiness().getId());
		assertNotNull(certification.getBusiness().getCompanyName());
	}
	
}