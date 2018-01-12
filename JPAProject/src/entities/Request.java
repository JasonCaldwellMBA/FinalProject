package entities;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class Request {
	
	//===========================Fields====================================//
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id; 
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	//@JsonIgnore
	@ManyToOne
	@JoinColumn(name="vehicle_id")
	private Vehicle vehicle;
	private boolean completed;
	private boolean active;
	private String img;
	@JsonIgnore
	@ManyToMany
	@JoinTable(
			name="parts_request",
			joinColumns=@JoinColumn(
					name="request_id",
					referencedColumnName = "id"
			),
			inverseJoinColumns= @JoinColumn(
			name="part_id",
			referencedColumnName="id")
	)
	private List<Part> parts;
	private String description; 
	
	@Column(name="post_date")
	private Timestamp postDate; 
	
	@Column(name="expire_date")
	private Timestamp expireDate; 
	
	@Column(name="complete_date")
	private Timestamp completeDate; 
	
	private double estimate;
	
	//===========================Getters and Setters==========================//

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Vehicle getVehicle() {
		return vehicle;
	}

	public void setVehicle(Vehicle vehicle) {
		this.vehicle = vehicle;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Timestamp getPostDate() {
		return postDate;
	}

	public void setPostDate(Timestamp postDate) {
		this.postDate = postDate;
	}

	public Timestamp getExpireDate() {
		return expireDate;
	}

	public void setExpireDate(Timestamp expireDate) {
		this.expireDate = expireDate;
	}

	public Timestamp getCompleteDate() {
		return completeDate;
	}

	public void setCompleteDate(Timestamp completeDate) {
		this.completeDate = completeDate;
	}

	public double getEstimate() {
		return estimate;
	}

	public void setEstimate(double estimate) {
		this.estimate = estimate;
	}

	public List<Part> getParts() {
		return parts;
	}

	public void setParts(List<Part> parts) {
		this.parts = parts;
	}
	
	@Override
	public String toString() {
		return "Request [id=" + id + ", completed=" + completed + ", active=" + active + ", img=" + img + ", parts="
				+ parts + ", description=" + description + ", postDate=" + postDate + ", expireDate=" + expireDate
				+ ", completeDate=" + completeDate + ", estimate=" + estimate + "]";
	}
}
