package test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Part;

public class PartTest {
	private EntityManagerFactory emf;
	private EntityManager em;
	private Part part;
	
	@Before
	  public void setUp() throws Exception {
		this.emf = Persistence.createEntityManagerFactory("AutoDB");
		this.em = emf.createEntityManager();
		part = em.find(Part.class, 1);
	}
	
	@After
	  public void tearDown() throws Exception { 
		this.em.close();
		this.emf.close();
		part = null;
	}
	
//	@Test
//	public void test_part() {
//		assertEquals(1, part.getId());
//	}
//	
//	
//	@Test
//	public void test_part_mapping() {
//		assertNotNull(part.getId());
//		assertNotNull(part.getName());
//		assertNotNull(part.getCost());
//		assertNotNull(part.getSerialNumber());
//	}
	
}

