$(document).ready(function()
{
  $.ajax({
    type: "GET",
    url: "sample_response.xml",
    dataType: "xml",
    success: parseXml
  });
});

function parseXml(xml)
{
  $(xml).find("GiftRegistryItem").each(function()
  {
    $("#output").append('<li class="registryItem"><img src="' + $(this).find("ImageURL").text() + '"/><p>' + $(this).find("ItemName").text() + '</p></li>');
  });
}