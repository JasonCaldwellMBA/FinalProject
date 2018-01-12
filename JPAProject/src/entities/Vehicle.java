package entities;
//test
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Vehicle {
	
	//===========================Fields====================================//
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String make;
	private String model;
	private int year;
	private int mileage;
	@OneToMany(mappedBy="vehicle")
	private List<Request> requests;
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	private String vin;
	private boolean active; 
	
	//===========================Getters and Setters==========================//

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getMake() {
		return make;
	}

	public void setMake(String make) {
		this.make = make;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getMileage() {
		return mileage;
	}

	public void setMileage(int mileage) {
		this.mileage = mileage;
	}

	public List<Request> getRequests() {
		return requests;
	}

	public void setRequests(List<Request> requests) {
		this.requests = requests;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getVin() {
		return vin;
	}

	public void setVin(String vin) {
		this.vin = vin;
	}
	
	//====================================toString=======================================//

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	@Override
	public String toString() {
		return "Vehicle [id=" + id + ", make=" + make + ", model=" + model + ", year=" + year + ", mileage=" + mileage
				+ ", requests=" + requests + ", user=" + user + ", vin=" + vin + "]";
	}
	
	
}
