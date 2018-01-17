package entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

//test
@Entity
public class Certification {
	
	//==========================================Fields===========================================//

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String name;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="business_id")
	private Business business;
	
	//=====================================Getters and Setters=====================================//
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Business getBusiness() {
		return business;
	}

	public void setBusiness(Business business) {
		this.business = business;
	}
	
	//=======================================toString=============================================//

	@Override
	public String toString() {
		return "Certification [id=" + id + ", name=" + name + "]";
	}
}
