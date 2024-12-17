package com.hris.HRIS_job_portal.Config;

import com.hris.HRIS_job_portal.Utils.ConfigUtility;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    private static final String EXCHANGE_NAME = "profile.exchange";
    private static final String QUEUE_NAME = "profile.queue";

    @Autowired
    ConfigUtility configUtility;

    @Bean
    public ConnectionFactory connectionFactory() {
        try {
            if (configUtility.getProperty("RABBITMQ_HOST") == null || configUtility.getProperty("RABBITMQ_PORT") == null) {
                int port = Integer.parseInt(configUtility.getProperty("RABBITMQ_PORT"));
                String host = configUtility.getProperty("RABBITMQ_HOST");
                CachingConnectionFactory connectionFactory = new CachingConnectionFactory(host, port);
                connectionFactory.setUsername(configUtility.getProperty("RABBITMQ_USERNAME"));
                connectionFactory.setPassword(configUtility.getProperty("RABBITMQ_PASSWORD"));
                return connectionFactory;
            } else {
                CachingConnectionFactory connectionFactory = new CachingConnectionFactory("localhost", 5672);
                connectionFactory.setUsername(configUtility.getProperty("RABBITMQ_USERNAME"));
                connectionFactory.setPassword(configUtility.getProperty("RABBITMQ_PASSWORD"));
                return connectionFactory;
            }
        } catch (Exception e) {
            System.err.println("RabbitMQ is unavailable. Continuing without it.");
            return null; // Return null or a mock connection factory.
        }
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        return connectionFactory != null ? new RabbitTemplate(connectionFactory) : null;
    }

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(EXCHANGE_NAME);
    }

    @Bean
    public Queue queue() {
        return new Queue(QUEUE_NAME);
    }

    @Bean
    public Binding binding(Queue queue, TopicExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with("profile.updated");
    }
}