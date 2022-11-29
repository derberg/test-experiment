# Streetlights APIs 1.0.0 documentation

The Smartylighting Streetlights API allows you to remotely manage the city lights.

### Check dout its awesome features:

* Turn a specific streetlight on/off 🌃
* Dim a specific streetlight 😎
ds
* [Servers](#servers)ddddd
* [Channels](#channels)
create test
<a name="servers"></a> 

## asdfsadfsdfsdfsdf

<table>
  <thead>
    <tr>
      <th>URL</th>wefwefwerwer
      <th>Protocol</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>d
  <tr>
      <td>mqtt://test.mosquitto.org:{port}</td>
      <td>mqtt</td>
      <td>Test broker</td>
    </tr>
    <tr>
      <td colspan="3">r
        <details>
          <summary>URL Variables</summary>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Default value</th>
                <th>Possible values</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>port</td>
                <td>
                    1883
                  </td>
                <td>
                  <ul><li>1883</li><li>8883</li></ul>
                  </td>
                <td>Secure connection (TLS) is available through port 8883.</td>
              </tr>
              </tbody>
          </table>
        </details>
      </td>
    </tr>
    </tbody>
</table>




## Channels



<a name="channel-smartylighting/streetlights/1/0/event/{streetlightId}/lighting/measured"></a>

The topic on which measured values may be produced and consumed.ddd

#### Channel Parameters

##### streetlightId

The ID of the streetlight.

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
<tr>
  <td>streetlightId </td>
  <td>string</td>
  <td></td>
  <td><em>Any</em></td>
</tr>
    </tbody>
</table>




###  `publish` smartylighting/streetlights/1/0/event/{streetlightId}/lighting/measured

*Inform about environmental lighting conditions of a particular streetlight.* 

#### Message


Inform about environmental lighting conditions of a particular streetlight.

##### Headers


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
<tr>
  <td>my-app-header </td>
  <td>integer</td>
  <td></td>
  <td><em>Any</em></td>
</tr></tbody>
</table>


###### Example of headers _(generated)_

```json
{
  "my-app-header": 0
}
```



##### Payload


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
<tr>
  <td>lumens </td>
  <td>integer</td>
  <td><p>Light intensity measured in lumens.</p>
</td>
  <td><em>Any</em></td>
</tr>
<tr>
  <td>sentAt </td>
  <td>string</td>
  <td><p>Date and time when the message was sent.</p>
</td>
  <td><em>Any</em></td>
</tr></tbody>
</table>


###### Example of payload _(generated)_

```json
{
  "lumens": 0,
  "sentAt": "2019-08-24T14:15:22Z"
}
```

##### Tags



* message-tag1

* message-tag2

* message-tag3

* message-tag4

* message-tag5







<a name="channel-smartylighting/streetlights/1/0/action/{streetlightId}/turn/on"></a>


#### Channel Parameters

##### streetlightId

The ID of the streetlight.

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
<tr>
  <td>streetlightId </td>
  <td>string</td>
  <td></td>
  <td><em>Any</em></td>
</tr>
    </tbody>
</table>




###  `subscribe` smartylighting/streetlights/1/0/action/{streetlightId}/turn/on



#### Message


Command a particular streetlight to turn the lights on or off.

##### Headers


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
<tr>
  <td>my-app-header </td>
  <td>integer</td>
  <td></td>
  <td><em>Any</em></td>
</tr></tbody>
</table>


###### Example of headers _(generated)_

```json
{
  "my-app-header": 0
}
```



##### Payload


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
<tr>
  <td>command </td>
  <td>string</td>
  <td><p>Whether to turn on or off the light.</p>
</td>
  <td><code>on</code>, <code>off</code></td>
</tr>
<tr>
  <td>sentAt </td>
  <td>string</td>
  <td><p>Date and time when the message was sent.</p>
</td>
  <td><em>Any</em></td>
</tr></tbody>
</table>


###### Example of payload _(generated)_

```json
{
  "command": "on",
  "sentAt": "2019-08-24T14:15:22Z"
}
```





<a name="channel-smartylighting/streetlights/1/0/action/{streetlightId}/turn/off"></a>


#### Channel Parameters

##### streetlightId

The ID of the streetlight.

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
<tr>
  <td>streetlightId </td>
  <td>string</td>
  <td></td>
  <td><em>Any</em></td>
</tr>
    </tbody>
</table>




###  `subscribe` smartylighting/streetlights/1/0/action/{streetlightId}/turn/off



#### Message


Command a particular streetlight to turn the lights on or off.

##### Headers


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
<tr>
  <td>my-app-header </td>
  <td>integer</td>
  <td></td>
  <td><em>Any</em></td>
</tr></tbody>
</table>


###### Example of headers _(generated)_

```json
{
  "my-app-header": 0
}
```



##### Payload


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
<tr>
  <td>command </td>
  <td>string</td>
  <td><p>Whether to turn on or off the light.</p>
</td>
  <td><code>on</code>, <code>off</code></td>
</tr>
<tr>
  <td>sentAt </td>
  <td>string</td>
  <td><p>Date and time when the message was sent.</p>
</td>
  <td><em>Any</em></td>
</tr></tbody>
</table>


###### Example of payload _(generated)_

```json
{
  "command": "on",
  "sentAt": "2019-08-24T14:15:22Z"
}
```





<a name="channel-smartylighting/streetlights/1/0/action/{streetlightId}/dim"></a>


#### Channel Parameters

##### streetlightId

The ID of the streetlight.

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
<tr>
  <td>streetlightId </td>
  <td>string</td>
  <td></td>
  <td><em>Any</em></td>
</tr>
    </tbody>
</table>




###  `subscribe` smartylighting/streetlights/1/0/action/{streetlightId}/dim



#### Message


Command a particular streetlight to dim the lights.

##### Headers


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
<tr>
  <td>my-app-header </td>
  <td>integer</td>
  <td></td>
  <td><em>Any</em></td>
</tr></tbody>
</table>


###### Example of headers _(generated)_

```json
{
  "my-app-header": 0
}
```



##### Payload


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
<tr>
  <td>percentage </td>
  <td>integer</td>
  <td><p>Percentage to which the light should be dimmed to.</p>
</td>
  <td><em>Any</em></td>
</tr>
<tr>
  <td>sentAt </td>
  <td>string</td>
  <td><p>Date and time when the message was sent.</p>
</td>
  <td><em>Any</em></td>
</tr></tbody>
</table>


###### Example of payload _(generated)_

```json
{
  "percentage": 0,
  "sentAt": "2019-08-24T14:15:22Z"
}
```





