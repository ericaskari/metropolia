using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MainCamera : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        Debug.Log($"Start: {this.name} {this.gameObject.name}");
        
    }

    // Update is called once per frame
    void Update()
    {
        Debug.Log($"Update: {this.name} {this.gameObject.name}");
        
    }
}
