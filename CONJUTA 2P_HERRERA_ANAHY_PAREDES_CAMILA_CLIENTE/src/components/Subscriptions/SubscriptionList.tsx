// src/components/Subscriptions/SubscriptionList.tsx
import React, { useEffect, useState } from 'react';
import { getSubscriptions } from '../../api/api';

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const response = await getSubscriptions();
      setSubscriptions(response.data);
    };
    fetchSubscriptions();
  }, []);

  return (
    <div>
      <h1>Suscripciones</h1>
      <ul>
        {subscriptions.map((subscription) => (
          <li key={subscription.id}>{subscription.consumidor_id} - {subscription.curso_id}</li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionList;