package module.c;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.beans.factory.InitializingBean;

public class BindingInitializer implements InitializingBean{
	private final ConnectionFactory connectionFactory;
	private final String queue;
	private final String exchange;
	private final String binding;
	
	public BindingInitializer(ConnectionFactory connectionFactory, String exchange, String queue, String binding){
		this.connectionFactory = connectionFactory;
		this.queue = queue;
		this.binding = binding;
		this.exchange = exchange;
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		RabbitAdmin admin = new RabbitAdmin(this.connectionFactory);
		System.out.println("### Created RabbitAdmin: " + admin);
		DirectExchange exchange = new DirectExchange(this.exchange);
		System.out.println("### Created exchange: " + exchange);
		admin.declareExchange(exchange);
		Queue queue = new Queue(this.queue);
		System.out.println("### Created queue: " + queue);
		Binding binding = BindingBuilder.bind(queue).to(exchange).with(this.binding);
		admin.declareBinding(binding);
		System.out.println("### Finished binding  " + binding);
	}
}
