import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { db } from '../lib/firebase';
import Error from './Error';
import calculateEstimate from './../lib/estimates';
import { differenceInDays } from 'date-fns';

const List = ({ token }) => {
  const { docs, errorMessage } = useFirestore(token);

  const checkPurchasedDate = (purchasedDate) => {
    if (purchasedDate === null) {
      return false;
    }
    // time given in milliseconds
    const today = Date.now();
    // 24 hours in milliseconds
    const addOneDay = 86400000;
    // Add 24 hours to purchased
    const oneDayAfterPurchase = purchasedDate + addOneDay;

    // If today > oneDayAfterPurchase at least 24 hours have passed, return false to uncheck box
    if (today >= oneDayAfterPurchase) {
      return false;
    }

    return true;
  };

  const handleCheckbox = async (event) => {
    const currentDate = Date.now(); // time given in milliseconds
    const queryCollection = await db.collection(token).doc(event.target.id);
    // listItem is our current snapshot of the doc
    const listItem = docs.filter((doc) => doc.id === queryCollection.id)[0];
    const previouslyPurchasedDate = listItem.lastPurchased;

    /* latestInterval is the number of full days between the two dates
     * or the timeFrame if the function returns NaN
     */
    const latestInterval =
      differenceInDays(currentDate, previouslyPurchasedDate) ||
      listItem.timeFrame;

    // If item has not been purchased set to 1, else increment by 1
    const numberOfPurchases = (listItem.numberOfPurchases || 0) + 1;
    const daysUntilNextPurchase = calculateEstimate(
      listItem.timeFrame,
      latestInterval,
      numberOfPurchases,
    );

    // FOR THE DEMO
    // ------------------------------------------------------------------------------------
    // update day of demo
    // const oneWeekAgo = getTime(new Date(2021, 0, 26, 11, 30, 30));
    // oneWeekAgo simulates the last date of purchase for the item
    // console.log("Date a week ago: ", toDate(new Date(oneWeekAgo)));
    // const demoLatestInterval = currentDate - oneWeekAgo;
    // const exampleNumberOfPurchases = 7;
    // const demoEstimate = calculateEstimate(
    //   targetDoc[0].timeFrame,
    //   demoLatestInterval,
    //   exampleNumberOfPurchases,
    // );
    // demo estimate tells how long from purchase date until we're expected to buy it again
    // console.log('Demo estimate :', addMilliseconds(previouslyPurchasedDate, demoEstimate));
    // ------------------------------------------------------------------------------------
    // END OF DEMO

    queryCollection.update({
      lastPurchased: currentDate,
      daysUntilNextPurchase: daysUntilNextPurchase,
      numberOfPurchases: numberOfPurchases,
    });
  };

  return (
    <div>
      <h1>List</h1>

      {docs.length === 0 && (
        <section>
          <p>Your shopping list is currently empty.</p>
          <a href="/add-item">Add an Item</a>
        </section>
      )}

      {errorMessage && <Error errorMessage={errorMessage} />}

      <ul style={{ listStyleType: 'none' }}>
        {docs &&
          docs.map((doc) => (
            <li key={doc.id}>
              <input
                type="checkbox"
                name={doc.itemName}
                id={doc.id}
                onChange={handleCheckbox}
                checked={checkPurchasedDate(doc.lastPurchased)}
                //disabled={checkPurchasedDate(doc.lastPurchased)} // Commented out for PR purposes only
              />
              {doc.itemName}
              {doc.numberOfPurchases > 0 ? (
                <p>
                  Time until next purchase: {doc.daysUntilNextPurchase} days
                </p>
              ) : (
                <p>You haven't purchased {doc.itemName} yet.</p>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default List;
