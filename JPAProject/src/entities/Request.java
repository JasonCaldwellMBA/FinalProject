package entities;
import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

public class Request {
	private int id; 
	private User user;
	private Vehicle vehicle;
	private boolean completed;
	private boolean active;
	private String img;
	private PartRequest partRequest;
	private String description; 
	private Timestamp postDate; 
	private Timestamp expireDate; 
	private Timestamp completeDate; 
	private double estimate; 
}
