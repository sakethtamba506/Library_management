function createTableRow(dataObject) {
    const row = document.createElement('tr');

    // Loop through the object properties and create cells
    for (const key in dataObject) {
        const cell = document.createElement('td');
        cell.textContent = dataObject[key];
        row.appendChild(cell);
    }

    return row;
}

data={}


$(document).ready(function($) {

    $("#submit").on('click',async(e)=>{
        var selectedvalue = document.getElementById("options").value;
        document.getElementById('retrieveData').style.display = 'none';
        document.getElementById('newDataForm').style.display = 'none';
        document.getElementById('updateDataForm').style.display = 'none';

            // Show the selected div based on the option
        if (selectedvalue === 'retrievedata') {
            data = await getdata()
            const tableBody = document.getElementById('dataBody');
            while (tableBody.firstChild) {
                tableBody.removeChild(tableBody.firstChild);
            }

        // Loop through the data and append rows to the table
        data.forEach(dataObject => {
            const row = createTableRow(dataObject);
            tableBody.appendChild(row);
        });

        // Display the retrieved data
        document.getElementById('retrieveData').style.display = 'block';
        } else if (selectedvalue === 'newdata') {
            document.getElementById('newDataForm').style.display = 'block';
        } else if (selectedvalue === 'updatedata') {
            
            data = await getdata()
            const selectElement = document.getElementById('listbook');
            selectElement.innerHTML = '';

            // Create and append new options based on the data
            data.forEach(book => {
                const option = document.createElement('option');
                option.value = book._id;
                option.textContent = book.title;
                selectElement.appendChild(option);
            });
            document.getElementById('updateDataForm').style.display = 'block';
        }
    })
    $("#newsubmit").on('click',async(e)=>{
        const formData = {
            title: $("#title").val(),
            authors: $("#authors").val(),
            publisher: $("#publisher").val(),
            publicationDate: $("#publicationDate").val(),
            edition: $("#edition").val(),
            genre: $("#genre").val(),
            language: $("#language").val(),
            keywords: $("#keywords").val(),
            numOfCopies: parseInt($("#numOfCopies").val())
        };
        // console.log("working")

        // Call the new function with form data
        const msg = await newdataentry(formData);
        if(msg.data=="0")
        {
            alert("Book already present");
        }
        else
        {
            alert("book added succesfully");
        }
       

    })
    $("#listbook").on('change',async(e)=>{
        const selectedid = $('#listbook').val();
        // data = await getdata()
        const selectedBook = data.find(book => book._id === selectedid);
        // const selectElement = document.getElementById('listbook2');
        //     selectElement.innerHTML = '';

        //     // Create and append new options based on the data
        //     data.forEach(book => {
        //         const option = document.createElement('option');
        //         option.value = book.id;
        //         option.textContent = book.title;
        //         selectElement.appendChild(option);
        //     });
            // Update input fields with selected book data
        
        $('#utitle').val(selectedBook.title);
        $('#uauthors').val(selectedBook.authors);
        $('#upublisher').val(selectedBook.publisher);
        $('#upublicationDate').val(selectedBook.publicationDate);
        $('#uedition').val(selectedBook.edition);
        $('#ugenre').val(selectedBook.genre);
        $('#ulanguage').val(selectedBook.language);
        $('#ukeywords').val(selectedBook.keywords.join(', '));
        $('#unumOfCopies').val(selectedBook.numOfCopies);

    })

    $("#usubmit").on('click',async(e)=>{
        const formData = {
            title: $("#utitle").val(),
            authors: $("#uauthors").val(),
            publisher: $("#upublisher").val(),
            publicationDate: $("#upublicationDate").val(),
            edition: $("#uedition").val(),
            genre: $("#ugenre").val(),
            language: $("#ulanguage").val(),
            keywords: $("#ukeywords").val(),
            numOfCopies: parseInt($("#unumOfCopies").val())
        };
        console.log("working")
        const selectedid = $('#listbook').val();
        msg = await updateentry(formData,selectedid);
        if(msg.data="1")
        {
            alert("Updated succesfully");
        }
        else
        {
            alert("update failed");
        
        }
    })

});