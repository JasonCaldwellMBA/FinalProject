package test;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.PartQuote;

public class PartQuoteTest {
	private EntityManagerFactory emf;
	private EntityManager em;
	private PartQuote partQuote;
	
	@Before
	  public void setUp() throws Exception {
		this.emf = Persistence.createEntityManagerFactory("AutoDB");
		this.em = emf.createEntityManager();
		partQuote = em.find(PartQuote.class, 1);
	}
	
	@After
	  public void tearDown() throws Exception { 
		this.em.close();
		this.emf.close();
		partQuote = null;
	}
	
	@Test
	public void test_quote() {
		assertEquals(1, partQuote.getId());
	}
	
	
	@Test
	public void test_quote_mapping() {
	}
	
}

