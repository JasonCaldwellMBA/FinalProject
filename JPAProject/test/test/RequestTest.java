package test;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Request;

public class RequestTest {
    private EntityManagerFactory emf;
    private EntityManager em;
    private Request request;
    
    @Before
      public void setUp() throws Exception {
        this.emf = Persistence.createEntityManagerFactory("AutoDB");
        this.em = emf.createEntityManager();
        request = em.find(Request.class, 1);
    }
    
    @After
      public void tearDown() throws Exception { 
        this.em.close();
        this.emf.close();
        request = null;
    }
    
    @Test
    public void test_vehicle_mapping() {
        assertEquals(1, request.getId());
        assertEquals("desc1", request.getDescription());
        assertEquals("model1", request.getVehicle().getModel());
        assertEquals("2017-12-31 11:30:45.0", request.getCompleteDate().toString());
        assertEquals(false, request.isCompleted());
        assertEquals(false, request.isActive());
        assertEquals("IMG", request.getImg());
        assertEquals("2017-03-31 11:30:45.0", request.getExpireDate().toString());
        assertEquals("2018-01-01 11:30:45.0", request.getPostDate().toString());
        assertEquals(1, request.getEstimate(), 0.01);
        
    }
    
    
    @Test
    public void test_quote_mapping() {
    }
    
}