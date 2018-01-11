package entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class Request extends Order {

	@ManyToOne
	private Vehicle vehicle;
	
	@ManyToOne
	private User user;
	
	private boolean completed;
	
	private boolean active;
	
	private String img;
	
	private List<Part> parts;
}
