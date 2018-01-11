package entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

public class Vehicle {
	
	private int id;
	
	private String make;
	
	private String model;
	
	private int year;
	
	private int mileage;
	
	private List<Request> requests;
	
	private User user;
	
	private String vin;
	
}
