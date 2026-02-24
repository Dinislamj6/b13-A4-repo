 
## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

answer: getElementById vs getElementBy ClassName 
 when Dom from specific one Element need then id use reason getElementById specific one element will find out 
 but when Dom from more Element need the class use reason getElementById more Element will find out .

 **querySelector vs querySelectorAll?**
 answer: const name = document.querySelectorAll(.head  span);
      its head class inside all span show even if there are many , the will show .

    but const name = document.querySelector(.head span)
    its head class inside only first span show even if the are many span , just first span Show 



## 2. How do you create and insert a new element into the DOM?

answer : example: 
   step 1 : create new element 
  const newElement = document.createElement('div')
  step 2 : newElement innerText set
  newElement.innerText = 'hello programming hero'
  step 3 : when you can use html body append the newElement ;
  document.body.appendChild(newElement)



